import GoogleButton from "../GoogleButton/GoogleButton";
import styles from "./ModalLogIn.module.scss";

const ModalLogIn = () => {
  return (
    <div className={styles.modal_content}>
      <h1 className={styles.modal_content__h1}>Log In</h1>
      <p className={styles.modal_content__p}>
        {" "}
        By continuing, you agree are setting up a Reddit account and agree to
        our{" "}
        <a
          className={styles.modal_content__p__a}
          href="https://www.redditinc.com/policies/user-agreement"
        >
          {" "}
          User Agreement{" "}
        </a>
        and{" "}
        <a
          className={styles.modal_content__p__a}
          href="https://www.reddit.com/policies/privacy-policy"
        >
          {" "}
          Privacy Policy.
        </a>
      </p>
      <GoogleButton />
      <button className={styles.modal_content__button_apple}>
        <svg
          className={styles.modal_content__button_apple_svg}
          width="18px"
          height="18px"
          viewBox="0 0 256 315"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <g>
            <path
              d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249"
              fill="#000000"
            ></path>
          </g>
        </svg>
        <span>Continue with Apple</span>
      </button>
      <div className={styles.modal_content__span}>
        <span className={styles.modal_content__span_span1}></span>
        <span className={styles.modal_content__span_span2}>OR</span>
        <span className={styles.modal_content__span_span3}></span>
      </div>
      <input
        type="text"
        className={styles.modal_content_input__username}
        id="username"
        placeholder="Username"
      />
      <input
        type="text"
        className={styles.modal_content_input__password}
        id="Password"
        placeholder="Password"
      />
      <div className={styles.modal_content__div}>
        Forget your{" "}
        <a
          className={styles.modal_content__div__a}
          href="/username?experiment_d2x_2020ify_buttons=enabled&amp;experiment_d2x_google_sso_gis_parity=enabled&amp;experiment_d2x_onboarding=enabled&amp;experiment_d2x_am_modal_design_update=enabled"
        >
          username
        </a>{" "}
        or{" "}
        <a
          className={styles.modal_content__div__a}
          href="/password?experiment_d2x_2020ify_buttons=enabled&amp;experiment_d2x_google_sso_gis_parity=enabled&amp;experiment_d2x_onboarding=enabled&amp;experiment_d2x_am_modal_design_update=enabled"
        >
          password
        </a>{" "}
        ?
      </div>
      <button className={styles.modal_content__button__login} type="submit">
        Log In
      </button>
      <div className={styles.modal_content__div}>
        New to Reddit?
        <a
          className={styles.modal_content__div__a}
          href="/account/register/?experiment_d2x_2020ify_buttons=enabled&amp;experiment_d2x_google_sso_gis_parity=enabled&amp;experiment_d2x_onboarding=enabled&amp;experiment_d2x_am_modal_design_update=enabled"
        >
          {" "}
          Sign Up{" "}
        </a>
      </div>
    </div>
  );
};
export default ModalLogIn;
