<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Blog Management System</title>
  
  <link href="/assets/vendors/bootstrap/css/bootstrap.css" rel="stylesheet">
  <link href="/assets/vendors/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <link href="/assets/vendors/ckeditor5/ckeditor5.css" rel="stylesheet">
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a href="#" class="navbar-brand">
      <img src="assets/img/logo/logo.png" class="img-fluid" alt="logo" width="30">
    </a>

    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
      <i class="bi bi-list"></i>
    </button>

    <div class="collapse navbar-collapse" id="navbar">
      <div class="navbar-nav ms-auto">
        Blogs
      </div>
    </div>
  </div>
</nav>

<div class="container p-5">
  <div class="mb-3">
    <a href="add.php" type="button" class="btn btn-outline-primary">Add Blogs</a>
  </div>
  <div class="d-flex justify-content-center">
  <div class="col-sm-12 col-md-12 col-lg-12">
    <div class="card">
      <div class="card-body">
        <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="post">
  <div class="mb-2">
    <label class="form-label">Blog Name</label>
    <input type="text" class="form-control" name="blog_name" placeholder="Enter Blog Name">
  </div>

  <div class="mb-2">
    <label class="form-label">Blog URL</label>
    <textarea class="form-control" name="blog_content" placeholder="Enter Blog Name"></textarea>
  </div>

  <div class="mb-2">
    <label class="form-label">Blog Content</label>
    <input type="text" class="form-control" name="blog_url" placeholder="Enter Blog Name">
  </div>
  <div class="mb-2">
    <label class="form-label">Cancel</label>
    <input type="submit" class="btn btn-sucess" value="Save Blog">
  </div>
</form>

        <table class="table">
          <thead class="text-center">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Added On</th>
              <th>Action</th>
            </tr>
            <tbody ="text-center">
                <?php
require_once 'connection.php';

$sql = "SELECT * FROM blogs";
$result = mysqli_query($link, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . $row['blog_title'] . "</td>";
        echo "<td>" . $row['blog_url'] . "</td>";
        echo "<td>" . $row['blog_added_on'] . "</td>";
        echo "</tr>";
    }
}
?>

          </thead>
        </table>
      </div>
    </div>
  </div>
</div>

</div>


  <script src="/assets/vendors/jquery/jquery.min.js"></script>
  <script src="/assets/vendors/popper/popper.js"></script>
  <script src="/assets/vendors/bootstrap/js/bootstrap.js"></script>
  <script src="/assets/vendors/ckeditor5/ckeditor5.js"></script>

</body>
</html>
