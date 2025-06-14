$(document).ready(function() {
    let currentCategoryId = null;
    let currentMode = 'main_menu';
    
    // Start chat button click
    $('#start-button').click(function() {
        startChat();
    });
    
    // Reset button click
    $('#reset-button, #floating-restart-button').click(function() {
        resetChat();
    });
    
    // Close modals
    $('.close').click(function() {
        $(this).closest('.modal').hide();
    });
    
    // Click outside modal to close
    $(window).click(function(event) {
        if ($(event.target).hasClass('modal')) {
            $('.modal').hide();
        }
    });
    
    function startChat() {
        $('#start-container').hide();
        $('#chat-container').show();
        $('#chat-area').show();
        $('#categories-container').show();
        
        // Show floating restart button
        $('#floating-restart-button').addClass('show');
        
        // Show loading state
        $('#chat-history').html(`
            <div class="loading">
                <div class="spinner"></div>
                <p>Initializing your cooking assistant...</p>
            </div>
        `);
        
        $.ajax({
            url: '',
            method: 'POST',
            data: { action: 'start_chat' },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    $('#chat-history').empty();
                    addMessage('bot', response.message);
                    showCategories(response.categories);
                }
            },
            error: function() {
                showError('Error starting chat. Please try again.');
                $('#start-container').show();
                $('#chat-container').hide();
                $('#floating-restart-button').removeClass('show');
            }
        });
    }
    
    function addMessage(sender, message) {
        const messageClass = sender === 'bot' ? 'bot-message' : 'user-message';
        const icon = sender === 'bot' ? '<i class="fas fa-robot message-icon"></i>' : '<i class="fas fa-user message-icon"></i>';
        
        const messageHtml = `
            <div class="message ${messageClass}">
                ${icon}${message}
            </div>
        `;
        $('#chat-history').append(messageHtml);
        $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
    }
    
    function showCategories(categories) {
        $('#categories-list').empty();
        $('#options-container').hide();
        $('#response-container').hide();
        $('#categories-container').show();
        
        Object.keys(categories).forEach(function(key) {
            const category = categories[key];
            const categoryCard = $(`
                <div class="category-card" data-category="${key}">
                    <div class="category-content">
                        <div class="category-icon">
                            <i class="${category.icon}"></i>
                        </div>
                        <h3 class="category-title">${category.title}</h3>
                        <p class="category-description">${category.description}</p>
                    </div>
                </div>
            `);
            
            categoryCard.click(function() {
                const categoryKey = $(this).data('category');
                selectCategory(categoryKey, category.title);
            });
            
            $('#categories-list').append(categoryCard);
        });
    }
    
    function selectCategory(categoryKey, categoryTitle) {
        addMessage('user', categoryTitle);
        currentMode = categoryKey;
        
        // Show loading
        $('#categories-container').hide();
        $('#options-container').show();
        $('#options-list').html(`
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading options...</p>
            </div>
        `);
        
        $.ajax({
            url: '',
            method: 'POST',
            data: { 
                action: 'select_category',
                category: categoryKey
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    if (response.back_to_menu) {
                        addMessage('bot', response.message);
                        showBackToMenuButton();
                    } else {
                        addMessage('bot', response.message);
                        
                        if (response.mode === 'recipe_finder') {
                            showRecipeOptions(response.options, response.category_id);
                        } else {
                            showChatOptions(response.options, response.mode);
                        }
                    }
                }
            },
            error: function() {
                showError('Error loading category. Please try again.');
            }
        });
    }
    
    function showRecipeOptions(options, categoryId) {
        currentCategoryId = categoryId;
        $('#options-list').empty();
        
        options.forEach(function(option) {
            const button = $(`
                <button class="option-button" data-option-id="${option.option_id}">
                    <span>${option.display_name}</span>
                </button>
            `);
            button.click(function() {
                const optionId = $(this).data('option-id');
                selectRecipeOption(optionId, categoryId, option.display_name);
            });
            $('#options-list').append(button);
        });
    }
    
    function showChatOptions(options, mode) {
        $('#options-list').empty();
        
        options.forEach(function(option) {
            const button = $(`
                <button class="option-button" data-response-id="${option.id}">
                    <span>${option.text}</span>
                </button>
            `);
            button.click(function() {
                const responseId = $(this).data('response-id');
                handleChatResponse(responseId, mode, option.text);
            });
            $('#options-list').append(button);
        });
    }
    
    function selectRecipeOption(optionId, categoryId, displayName) {
        addMessage('user', displayName);
        
        // Show loading
        $('#options-list').html(`
            <div class="loading">
                <div class="spinner"></div>
                <p>Processing your preferences...</p>
            </div>
        `);
        
        $.ajax({
            url: '',
            method: 'POST',
            data: { 
                action: 'submit_answer',
                option_id: optionId,
                category_id: categoryId
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    if (response.completed) {
                        // Show recipes
                        $('#chat-container').hide();
                        $('#recipes-container').show();
                        $('#floating-restart-button').addClass('show');
                        showRecipes(response.recipes);
                    } else {
                        // Show next question
                        addMessage('bot', response.message);
                        showRecipeOptions(response.options, response.category_id);
                        currentCategoryId = response.category_id;
                    }
                }
            },
            error: function() {
                showError('Error processing your choice. Please try again.');
            }
        });
    }
    
    function handleChatResponse(responseId, mode, userText) {
        addMessage('user', userText);
        
        $.ajax({
            url: '',
            method: 'POST',
            data: { 
                action: 'handle_response',
                response_id: responseId,
                mode: mode
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    if (response.keep_options) {
                        // Add engaging bot response to chat history
                        let engagingResponse = getEngagingResponse(response.response.title);
                        addMessage('bot', engagingResponse);
                        
                        // Show split view with response on left, options on right
                        $('#options-container').hide();
                        $('#response-container').show();
                        
                        $('#response-content').html(`
                            <h3>${response.response.title}</h3>
                            <div class="response-text">${response.response.content}</div>
                            <button class="back-to-menu-button" onclick="backToMenu()" style="margin-top: 2rem;">
                                <i class="fas fa-arrow-left"></i> Back to Main Menu
                            </button>
                        `);
                        
                        // Show options on the right
                        if (!$('#response-options').length) {
                            $('#response-container').append(`
                                <div id="response-options" class="response-options">
                                    <h4>Other Topics</h4>
                                    <div id="response-options-list" class="response-options-grid"></div>
                                </div>
                            `);
                        }
                        
                        $('#response-options-list').empty();
                        response.options.forEach(function(option) {
                            const activeClass = option.id === responseId ? 'active' : '';
                            const button = $(`
                                <button class="response-option-button ${activeClass}" data-response-id="${option.id}">
                                    ${option.text}
                                </button>
                            `);
                            button.click(function() {
                                if (!$(this).hasClass('active')) {
                                    const newResponseId = $(this).data('response-id');
                                    const newOptionText = $(this).text();
                                    handleChatResponseSplit(newResponseId, mode, newOptionText);
                                }
                            });
                            $('#response-options-list').append(button);
                        });
                    } else {
                        // Original single response view
                        $('#options-container').hide();
                        $('#response-container').show();
                        
                        let backButton = '';
                        if (response.show_back_to_menu) {
                            backButton = `
                                <button class="back-to-menu-button" onclick="backToMenu()">
                                    <i class="fas fa-arrow-left"></i> Back to Main Menu
                                </button>
                            `;
                        }
                        
                        $('#response-content').html(`
                            <h3>${response.response.title}</h3>
                            <div class="response-text">${response.response.content}</div>
                            ${backButton}
                        `);
                    }
                }
            },
            error: function() {
                showError('Error loading response. Please try again.');
            }
        });
    }
    
    function handleChatResponseSplit(responseId, mode, userText) {
        // Add the user message to chat history
        addMessage('user', userText);
        
        // Get the response and update content
        $.ajax({
            url: '',
            method: 'POST',
            data: { 
                action: 'handle_response',
                response_id: responseId,
                mode: mode
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    // Add engaging bot response to chat history
                    let engagingResponse = getEngagingResponse(response.response.title);
                    addMessage('bot', engagingResponse);
                    
                    // Update the detailed content on the left
                    $('#response-content').html(`
                        <h3>${response.response.title}</h3>
                        <div class="response-text">${response.response.content}</div>
                        <button class="back-to-menu-button" onclick="backToMenu()" style="margin-top: 2rem;">
                            <i class="fas fa-arrow-left"></i> Back to Main Menu
                        </button>
                    `);
                    
                    // Update active state
                    $('.response-option-button').removeClass('active');
                    $(`.response-option-button[data-response-id="${responseId}"]`).addClass('active');
                }
            },
            error: function() {
                showError('Error loading response. Please try again.');
            }
        });
    }
    
    function getEngagingResponse(title) {
        const engagingResponses = {
            // Platform Guide responses
            'How to Like a Recipe': 'Great choice! Let me show you how to save your favorite recipes with just one click! ❤️',
            'How to Comment on a Recipe': 'Perfect! Sharing your cooking experiences helps our community grow. Here\'s how to leave feedback! 💬',
            'How to Save Recipes': 'Smart thinking! Building your personal recipe collection is so useful. Here\'s the easy way! 🔖',
            'How to Share Recipes': 'Wonderful! Spreading delicious recipes with friends makes cooking even more fun! 📤',
            'How to Create an Account': 'Excellent! Getting started with Folklore will unlock so many features for you! 🌟',
            'Managing Your Profile': 'Good question! Personalizing your profile helps us give you better recommendations! ⚙️',
            
            // Cooking Tips responses
            'Essential Knife Skills': 'Fantastic choice! Mastering knife skills will transform your cooking efficiency! 🔪',
            'Cooking Methods Guide': 'Perfect! Understanding different cooking methods opens up endless possibilities! 🍳',
            'Spices and Herbs Guide': 'Excellent! Spices are the secret to making any dish extraordinary! 🌿',
            'Food Safety Essentials': 'Very important! Keeping your kitchen safe ensures delicious and healthy meals! 🛡️',
            'Baking Success Tips': 'Great pick! Baking is both science and art - let me share the secrets! 🧁',
            'Essential Kitchen Tools': 'Smart question! Having the right tools makes cooking so much easier! 🔧',
            
            // Restaurant Guide responses
            'Find Restaurants Near You': 'Perfect! Let me help you discover amazing dining spots in your area! 📍',
            'Exploring Different Cuisines': 'Exciting! Trying new cuisines is such a delicious adventure! 🌍',
            'Restaurant Etiquette': 'Great thinking! Good etiquette makes dining experiences better for everyone! 🍽️',
            'Making Restaurant Reservations': 'Smart move! Proper reservation skills ensure you get the best tables! 📞',
            'Restaurants for Dietary Restrictions': 'Important question! Everyone deserves to enjoy dining out safely! 🌱',
            'Best Restaurant Finding Apps': 'Excellent! Technology makes finding great food so much easier! 📱',
            
            // Nutrition responses
            'Reading Nutrition Labels': 'Great choice! Understanding labels empowers you to make healthier decisions! 🏷️',
            'Healthy Ingredient Substitutions': 'Smart thinking! Small swaps can make big differences in nutrition! 🔄',
            'Portion Control Tips': 'Wise question! Portion awareness is key to balanced eating! ⚖️',
            'Creating Balanced Meals': 'Perfect! Balanced meals give you energy and keep you satisfied! 🥗',
            'Special Dietary Needs': 'Important topic! Everyone deserves to enjoy delicious, suitable food! 💚',
            'Healthy Cooking Methods': 'Excellent! Cooking methods can boost nutrition while keeping flavors amazing! 🥘',
            
            // Recipe Modifications responses
            'Dietary Adaptations': 'Great question! Adapting recipes means everyone can enjoy the same delicious meal! 🔄',
            'Reduce Calories and Fat': 'Smart choice! You can make dishes lighter without sacrificing flavor! ✨',
            'Increase Protein Content': 'Perfect! Boosting protein helps with energy and satisfaction! 💪',
            'Scaling Recipes Up or Down': 'Practical thinking! Whether cooking for one or twenty, I\'ve got you covered! 📏',
            'Common Ingredient Substitutions': 'Lifesaver topic! These swaps will rescue so many cooking situations! 🆘',
            'Allergy-Friendly Modifications': 'Very important! Safe cooking means everyone can enjoy the meal together! 🛡️',
            
            // Meal Planning responses
            'Weekly Meal Planning Strategies': 'Excellent choice! Good planning saves time, money, and stress! 📅',
            'Meal Prep Basics and Tips': 'Smart thinking! Meal prep is your secret weapon for busy weeks! 📦',
            'Budget-Friendly Meal Planning': 'Great question! Eating well doesn\'t have to break the bank! 💰',
            'Creating Efficient Shopping Lists': 'Perfect! Organized shopping saves time and prevents forgotten ingredients! 📝',
            'Batch Cooking Techniques': 'Brilliant strategy! Cook once, eat multiple times - so efficient! 🍲',
            'Food Storage and Organization': 'Essential knowledge! Proper storage keeps food fresh and your kitchen organized! 📦',
            
            // Cooking Basics responses
            'Setting Up Your Kitchen': 'Perfect starting point! A well-organized kitchen makes cooking so much easier! 🏠',
            'Basic Cooking Techniques': 'Excellent foundation! These techniques will serve you for life! 👨‍🍳',
            'How to Read and Follow Recipes': 'Great question! Recipe reading is like learning a new language - so useful! 📖',
            'Basic Seasoning and Flavoring': 'Fantastic choice! Good seasoning is what separates good cooks from great ones! 🧂',
            'Kitchen Safety Fundamentals': 'Very important! A safe kitchen is a happy kitchen! 🛡️',
            'Easy Recipes for Beginners': 'Perfect! Everyone starts somewhere - these will build your confidence! 🌟'
        };
        
        return engagingResponses[title] || 'Here\'s what you need to know about this topic!';
    }
    
    function showRecipes(recipes) {
        if (recipes.length === 0) {
            $('#recipes-list').html(`
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No recipes found</h3>
                    <p>We couldn't find any recipes matching your exact preferences, but don't worry! Try adjusting your selections or browse our popular recipes.</p>
                </div>
            `);
            return;
        }
        
        $('#recipes-list').empty();
        recipes.forEach(function(recipe) {
            const totalTime = (parseInt(recipe.recipe_preptime) || 0) + (parseInt(recipe.recipe_cookingtime) || 0);
            const similarityScore = recipe.similarity_score || 0;
            
            const recipeCard = $(`
                <div class="recipe-card" data-recipe-id="${recipe.recipe_id}">
                    ${similarityScore > 0 ? `<div class="similarity-badge">${similarityScore}% match</div>` : ''}
                    <div class="recipe-image" style="background-image: url('${recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'}')"></div>
                    <div class="recipe-content">
                        <h3 class="recipe-title">${recipe.recipe_name}</h3>
                        <p class="recipe-description">${recipe.description || 'A delicious recipe crafted with traditional techniques and authentic flavors.'}</p>
                        <div class="recipe-meta">
                            <span class="meta-item">
                                <i class="fas fa-clock"></i> ${totalTime || 30} min
                            </span>
                            <span class="meta-item">
                                <i class="fas fa-users"></i> ${recipe.servings || 4} servings
                            </span>
                        </div>
                    </div>
                </div>
            `);
            
            recipeCard.click(function() {
                const recipeId = $(this).data('recipe-id');
                showRecipeDetails(recipeId);
            });
            
            $('#recipes-list').append(recipeCard);
        });
    }
    
    function showRecipeDetails(recipeId) {
        // Show loading in modal
        $('#recipe-details').html(`
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading recipe details...</p>
            </div>
        `);
        $('#recipe-modal').show();
        
        $.ajax({
            url: '',
            method: 'POST',
            data: { 
                action: 'get_recipe_details',
                recipe_id: recipeId
            },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    const recipe = response.recipe;
                    const instructionsFormatted = formatInstructions(recipe.recipe_cookstep);
                    const ingredientsFormatted = formatIngredients(recipe.recipe_ingredient);
                    const totalTime = (parseInt(recipe.recipe_preptime) || 0) + (parseInt(recipe.recipe_cookingtime) || 0);
                    
                    $('#recipe-details').html(`
                        <div class="recipe-header">
                            <h2>${recipe.recipe_name}</h2>
                            <div class="recipe-image-large" style="background-image: url('${recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}')"></div>
                            <div class="recipe-meta-large">
                                <span class="meta-item-large">
                                    <i class="fas fa-clock"></i> Prep: ${recipe.recipe_preptime || 15} min
                                </span>
                                <span class="meta-item-large">
                                    <i class="fas fa-fire"></i> Cook: ${recipe.recipe_cookingtime || 15} min
                                </span>
                                <span class="meta-item-large">
                                    <i class="fas fa-users"></i> Serves: ${recipe.servings || 4}
                                </span>
                            </div>
                            ${recipe.description ? `<p style="color: var(--gray-600); font-size: 1.1rem; line-height: 1.6; margin-top: 1rem;">${recipe.description}</p>` : ''}
                        </div>
                        
                        <div class="ingredients-section">
                            <h3 class="section-title">
                                <i class="fas fa-carrot"></i> Ingredients
                            </h3>
                            <div class="ingredients-list">
                                ${ingredientsFormatted}
                            </div>
                        </div>
                        
                        <div class="instructions-section">
                            <h3 class="section-title">
                                <i class="fas fa-list-ol"></i> Instructions
                            </h3>
                            <div class="instructions-list">
                                ${instructionsFormatted}
                            </div>
                        </div>
                    `);
                }
            },
            error: function() {
                $('#recipe-details').html(`
                    <div class="no-results">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Error Loading Recipe</h3>
                        <p>We couldn't load the recipe details. Please try again.</p>
                    </div>
                `);
            }
        });
    }
    
    function formatIngredients(ingredients) {
        if (!ingredients) return '<p>No ingredients listed.</p>';
        
        // Split by comma, semicolon, or newline and create grid items
        const items = ingredients.split(/[,;\n]/).map(item => item.trim()).filter(item => item.length > 0);
        let html = '<div class="ingredients-grid">';
        items.forEach(item => {
            html += `
                <div class="ingredient-item">
                    <i class="fas fa-check-circle"></i>
                    <span>${item}</span>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }
    
    function formatInstructions(instructions) {
        if (!instructions) return '<p>No instructions available.</p>';
        
        // Split by numbered steps, newlines, or periods followed by space
        const steps = instructions.split(/\n|(?=\d+\.)|(?<=\.)\s+(?=[A-Z])/)
            .map(step => step.trim())
            .filter(step => step.length > 0);
        
        let html = '';
        steps.forEach(step => {
            if (step.trim()) {
                // Remove existing numbering
                const cleanStep = step.replace(/^\d+\.\s*/, '');
                if (cleanStep.length > 0) {
                    html += `
                        <div class="instruction-item">
                            <div class="instruction-text">${cleanStep}</div>
                        </div>
                    `;
                }
            }
        });
        return html || '<p>No instructions available.</p>';
    }
    
    function resetChat() {
        $.ajax({
            url: '',
            method: 'POST',
            data: { action: 'reset_chat' },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    $('#chat-container').hide();
                    $('#recipes-container').hide();
                    $('#start-container').show();
                    $('#chat-history').empty();
                    $('#categories-list').empty();
                    $('#options-list').empty();
                    $('#recipes-list').empty();
                    $('#response-content').empty();
                    $('#response-options').remove();
                    $('#floating-restart-button').removeClass('show');
                    currentMode = 'main_menu';
                }
            },
            error: function() {
                showError('Error resetting chat. Please try again.');
            }
        });
    }
    
    function showError(message) {
        // You can implement a toast notification system here
        alert(message);
    }
    
    // Global function for back to menu button
    window.backToMenu = function() {
        $.ajax({
            url: '',
            method: 'POST',
            data: { action: 'back_to_menu' },
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    addMessage('bot', response.message);
                    showCategories(response.categories);
                    $('#response-container').hide();
                    $('#response-options').remove();
                }
            },
            error: function() {
                showError('Error returning to menu. Please try again.');
            }
        });
    };
});