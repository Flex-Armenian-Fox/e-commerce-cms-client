<template>
    <div class="jumbotron d-flex align-items-center min-vh-100">
        <form class="col-lg-3">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
            <br>
            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                </ul>
            </div>
        </form>
        <div class="col-lg-6">
            <img src="../assets/photos/signin.jpg" alt="Login Image">
        </div>
    </div>
</template>
