<?php
include('../dbconnect.php');

// Get recipe ID dynamically from URL (fallback to 1 if not set)
$recipe_id = isset($_GET['recipe_id']) ? intval($_GET['recipe_id']) : 1;

$query = "SELECT * FROM recipe WHERE recipe_id = $recipe_id";
$result = $conn->query($query);

if (!$result) {
    die("Query failed: " . $conn->error);
}

$recipe = $result->fetch_assoc();

if (!$recipe) {
    die("No recipe found with recipe_id = $recipe_id");
}
?>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../assets/styling/recipe.css">
<article class="recipe">

<h1>
<?php echo $recipe['recipe_name']; ?>
</h1>

<div class="stars">
	<p class="rate">Rate my recipe :</p>
	<i class="fa fa-star"></i>
	<i class="fa fa-star"></i>
	<i class="fa fa-star"></i>
	<i class="fa fa-star"></i>
	<i class="fa fa-star-half-o"></i>
</div>

<div class="time">
	<p><i class="fa fa-clock-o"></i> Prep Time      :   <?php echo $recipe['recipe_preptime']; ?> min </p>
	<p><i class="fa fa-clock-o"></i> Cooking Time   :   <?php echo $recipe['recipe_cookingtime']; ?> min </p>
</div>

<div class="recipe-image">
	<div class="ingredient-image">
	</div>
	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/chili.jpg">
	<p class="quote" >My grandpappy used to make this chili over the campfire under the Texas stars. The secret ingredient was a little squeeze of scorpion venom in the pot.<span class="cite">-Chris</span></p>
</div>
<!-- 
<div class="recipe-text">
	<h2>Ingredients <i class="slidetoggle fa fa-arrow-up right"></i></h2>
	<div class="inner-text">
		<h3></h3>
		<ul class="need">
			<li data-image="http://www.lowellprovisionco.com/files/Ground_buffalo.jpg">
				<i class="fa fa-square-o"></i>
				<strong>1lb</strong>
				ground bison
			</li>
			<li data-image="http://www.markon.com/sites/default/files/styles/product_banner/public/prdimg/RSS_Onions_Ylw_Diced_0.jpg">
				<i class="fa fa-square-o"></i>
				<strong>1 cup</strong>
				diced onion
			</li>
			<li data-image="http://www.mredepot.com/catalog/jalapenos%20diced%20(2).jpg">
				<i class="fa fa-square-o"></i>
				<strong>4</strong>
				diced jalepeños
			</li>
			<li data-image="http://anniegreenjeans.com/wp-content/uploads/2009/08/black-beans.jpg">
				<i class="fa fa-square-o"></i>
				<strong>1 cup</strong>
				black beans
			</li>
			<li data-image="http://www.zarina.ca/uploads/temp/img8902356.jpg">
				<i class="fa fa-square-o"></i>
				<strong>1 cup</strong>
				great northern beans
			</li>
			<li data-image="http://www.iknowlegumes.com/images/beans/original/kidney-beans.jpg">
				<i class="fa fa-square-o"></i>
				<strong>1 cup</strong>
				kidney beans
			</li>
			<li data-image="http://www.canningbasics.com/images/pintobeans.jpg">
				<i class="fa fa-square-o"></i>
				<strong>1 cup</strong>
				pinto beans
			</li>
			<li data-image="http://lukehoney.typepad.com/photos/uncategorized/2008/03/20/garlic1.jpg">
				<i class="fa fa-square-o"></i>
				<strong>4 cloves</strong>
				garlic
			</li>
			<li data-image="http://img.21food.com/20110609/descript/1307124583020.JPG">
				<i class="fa fa-square-o"></i>
				<strong>2 tbsp</strong>
				mexican chili powder
			</li>
			<li data-image="http://www.ericcressey.com/wp-content/uploads/2012/01/DenSalt.jpg">
				<i class="fa fa-square-o"></i>
				<strong>2 tsp</strong>
				salt
			</li>
			<li data-image="http://www.bigoven.com/uploads/groundpepper.jpg">
				<i class="fa fa-square-o"></i>
				<strong>2 tsp</strong>
				ground pepper
			</li>
			<li data-image="http://www.infiniteunknown.net/wp-content/uploads/2011/03/cayenne-pepper-the-king-of-herbs.jpg">
				<i class="fa fa-square-o"></i>
				<strong>1 tsp</strong>
				cayenne
			</li>
			<li data-image="http://www.freeenterprise.com/sites/default/files/styles/large/public/media/00_GOVT_shutterstock_83682121_Budget_800px.jpg?itok=tYArc6g3">
				<i class="fa fa-square-o"></i>
				<strong >28oz</strong>
				smushed tomatoes
			</li>
			<li data-image="http://www.bonappetit.com/wp-content/uploads/2008/08/ttar_beefbroth_h.jpg">
				<i class="fa fa-square-o"></i>
				<strong >3 cups</strong>
				beef broth
			</li>
		</ul>
		<div class="ingredients-have">
			<h2>You currently have in your basket</h2>
			<ul class="got">
			</ul>
		</div>
	</div>
</div>

<div class="recipe-directions">
	<h2>Directions <i class="slidetoggle fa fa-arrow-up right"></i></h2>
	<div class="inner-directions">
		<ol>
			<li>Get your filthiest campfire-scorched Dutch oven over the fire the best you can situate it.</li>
			<li>Brown the bison.</li>
			<li>Add the diced onion and spices, sautee until soft.</li>
			<li>Add tomatoes and broth and bring to a simmer for 40 minutes.</li>
			<li>Add beans and cook another 30 minutes.</li>
			<li>Serve with Tabasco and a giant spoon.</li>
		</ol>
	</div>
</div>

<div class="comments">
    <h2>How did your four-bean chili go? <i class="slidetoggle fa fa-arrow-up right"></i></h2>
    <div class="inner-comments">
        <form id="comment-form">
            <label for="comment-name">Your Name:</label>
            <input type="text" id="comment-name" placeholder="Your Name" required />
            <label for="comment-content">Your Comment:</label>
            <textarea id="comment-content" placeholder="Your Comment" required></textarea>
            <button type="submit">Add Comment</button>
        </form>
        <div id="comment-thread"></div>
    </div>
</div>
</article>
<div>
	
	<textarea>Add Your Own Notes Here! </textarea>

<div id="create">+</div>
</div>

<script src="../recipe/recipe.js"></script> -->

<div class="recipe-image">
	<div class="ingredient-image"></div>
	<img src="<?php echo htmlspecialchars($recipe['image_url']); ?>">
	<p class="quote"><?php echo htmlspecialchars($recipe['description']); ?></p>
</div>

<div class="recipe-text">
	<h2>Ingredients <i class="slidetoggle fa fa-arrow-up right"></i></h2>
	<div class="inner-text">
		<ul class="need">
		    <?php
		    $ingredients = explode(',', $recipe['recipe_ingredient']);
		    foreach ($ingredients as $ingredient) {
		        echo "<li><i class='fa fa-square-o'></i> " . htmlspecialchars(trim($ingredient)) . "</li>";
		    }
		    ?>
		</ul>
	</div>
</div>

<div class="recipe-directions">
	<h2>Directions <i class="slidetoggle fa fa-arrow-up right"></i></h2>
	<div class="inner-directions">
		<ol>
			<?php
			$steps = explode('.', $recipe['recipe_cookstep']);
			foreach ($steps as $step) {
			    $step = trim($step);
			    if (!empty($step)) {
			        echo "<li>" . htmlspecialchars($step) . ".</li>";
			    }
			}
			?>
		</ol>
	</div>
</div>

<div class="comments">
    <h2>How did your recipe go? <i class="slidetoggle fa fa-arrow-up right"></i></h2>
    <div class="inner-comments">
        <form id="comment-form">
            <label for="comment-name">Your Name:</label>
            <input type="text" id="comment-name" placeholder="Your Name" required />
            <label for="comment-content">Your Comment:</label>
            <textarea id="comment-content" placeholder="Your Comment" required></textarea>
            <button type="submit">Add Comment</button>
        </form>
        <div id="comment-thread"></div>
    </div>
</div>

</article>

<div>
	<textarea>Add Your Own Notes Here! </textarea>
	<div id="create">+</div>
</div>

<script src="../recipe/recipe.js"></script>