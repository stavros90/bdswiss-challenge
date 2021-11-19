<?php 
    /*
    Page: Coding Challenge
    Description: This is a WordPress template for the coding challenge of BDSwiss WordPress Developer role.
    */
    get_header();

?>

<main id="code-challenge">
    <section class="container-fluid header-banner">
        <h1>Trade Now</h1>
        <p>250+ Forex pairs & FDs on Shares, Indices, Energies & Metals</p>
        <a href="https://dashboard-eu.bdswiss.com/register" target="_blank" rel="noopener" class="blue-button" role="button">GET STARTED TODAY</a>
    </section>

    <section class="container-fluid rss-section">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="rss-feed">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/fxstreet.png'); ?>" alt="FXSTREET" class="rss-feed--icon">
                        <p class="rss-feed--desc">FXStreet is a leading source for reliable news and real time Forex analysis. FXStreet offers real-time exchange rates, chart and an economic calendar.</p>
                    </div>

                    <div class="rss-list">
                        <?php echo do_shortcode('[rss source="https://www.forexlive.com/feed" posts_limit="5"]'); ?>
                    </div>

                  <!--   <ul class="rss-list">
                        <li>
                            <div class="rss-list--icon">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-line" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path></svg>
                            </div>
                            <div class="rss-list-item">
                                <span class="rss-list--title">EUR/USD Price Analysis: Weekly Doji suggests indecision</span>
                                <span class="rss-list--meta">Mon Sep 14 2020 0:33:12 UTC</span>
                            </div>
                        </li>
                    </ul> -->
                </div>
            </div>
        </div>
    </section>

    <section class="container-fluid start-trading">

        <?php 
            if (!class_exists('ACF')) {
                /* Set Default text in case ACF is not installed */
                $sectionTitle = 'Start trading with BDSwiss';
                $sectionDescription = 'Access one of the largest and most liquid markets in the world! Enter the world of Forex & CFD online trading in just a few steps and start trading more than 250 instruments on our world-leading trading platforms. Register for a trading account in just a few simple steps, practice trading on a demo environment with real market prices and enjoy a unparalleled experience with our user-friendly portal and fast deposits and withdrawals with a range of trusted payment options.';

                $step1Title = 'Register';
                $step1Icon = get_template_directory_uri() . '/assets/images/register.png';
                $step1Description = 'Sign up and upload your documents to verify your account.';

                $step2Title = 'Fund';
                $step2Icon = get_template_directory_uri() . '/assets/images/fund.png';
                $step2Description = 'Once you understand all the benefits and risks involved you may fund your account.';

                $step3Title = 'Trade';
                $step3Icon = get_template_directory_uri() . '/assets/images/trade.png';
                $step3Description = 'Start trading on our WebTrader, Desktop or Mobile Platforms';

                $step4Title = 'Withdraw';
                $step4Icon = get_template_directory_uri() . '/assets/images/withdraw.png';
                $step4Description = 'Withdraw any profits or your entire account balance at any time!';
            } else {
                /* Get user input values */
                $sectionTitle = get_field('section_title');
                $sectionDescription = get_field('section_description');

                $step1Title = get_field('step1_title');
                $step1Icon = get_field('step1_icon');
                $step1Description = get_field('step1_description');

                $step2Title = get_field('step2_title');
                $step2Icon = get_field('step2_icon');
                $step2Description = get_field('step2_description');

                $step3Title = get_field('step3_title');
                $step3Icon = get_field('step3_icon');
                $step3Description = get_field('step3_description');

                $step4Title = get_field('step4_title');
                $step4Icon = get_field('step4_icon');
                $step4Description = get_field('step4_description');
            }
        ?>

        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-10 mx-auto">
                    <h2 class="section-title"><?php echo $sectionTitle; ?></h2>
                    <p class="section-introduction"><?php echo $sectionDescription; ?></p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="bd-step">
                        <img src="<?php echo $step1Icon; ?>" alt="<?php echo $step1Title; ?>" class="bd-step--icon">
                        <h3 class="bd-step--title"><?php echo $step1Title; ?></h3>
                        <p class="bd-step--desc"><?php echo $step1Description; ?></p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="bd-step">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/fund.png'); ?>" alt="fund" class="bd-step--icon">
                        <h3 class="bd-step--title">Fund</h3>
                        <p class="bd-step--desc">Once you understand all the benefits and risks involved you may fund your account.</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">   
                    <div class="bd-step">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/trade.png'); ?>" alt="trade" class="bd-step--icon">
                        <h3 class="bd-step--title">Trade</h3>
                        <p class="bd-step--desc">Start trading on our WebTrader, Desktop or Mobile Platforms</p>
                    </div>
                </div>
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="bd-step">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/withdraw.png'); ?>" alt="withdraw" class="bd-step--icon">
                        <h3 class="bd-step--title">Withdraw</h3>
                        <p class="bd-step--desc">Withdraw any profits or your entire account balance at any time!</p>
                    </div>
                </div>
            </div>
            <div class="row my-5 text-center">
                <div class="col-12">
                   <div class="risk-button">
                       <a href="https://dashboard-eu.bdswiss.com/register" target="_blank" rel="noopener" role="button" class="blue-button">OPEN AN ACCOUNT</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>

<?php get_footer();?>