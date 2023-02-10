import styles from "./ModalLogIn.module.scss";
import translate from "@/i18n/translate";
import {useIntl} from "react-intl";

const ModalLogIn = () => {
    const intl = useIntl();
    const placeholderUsername = intl.formatMessage({ id: 'Modal.placeholder.username', defaultMessage: 'Username' });
    const placeholderPassword = intl.formatMessage({ id: 'Modal.placeholder.password', defaultMessage: 'Password' });

  return (
    <div className={styles.modal_content}>
      <h1 className={styles.modal_content__h1}>{translate('ModalLogIn')}</h1>
      <p className={styles.modal_content__p}>{" "}
          {translate('ModalLogIn.policy')}
        {" "}
        <a
          className={styles.modal_content__p__a}
          href="https://www.redditinc.com/policies/user-agreement"
        >{" "}
            {translate('agreement')}
          {" "}
        </a>
        and {" "}
        <a
          className={styles.modal_content__p__a}
          href="https://www.reddit.com/policies/privacy-policy"
        >{" "}
            {translate('policy')}.
        </a>
      </p>
      <button className={styles.modal_content__button_google}>
        <svg
          className={styles.modal_content__button_google_svg}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            fill="#EA4335"
            d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
          />
          <path
            fill="#4285F4"
            d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
          />
          <path
            fill="#FBBC05"
            d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
          />
          <path
            fill="#34A853"
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
          />
          <path fill="none" d="M0 0h18v18H0z" />
        </svg>
        <span>{translate('withGoogle')}</span>
      </button>
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
        <span>{translate('withApple')}</span>
      </button>
      <div className={styles.modal_content__span}>
        <span className={styles.modal_content__span_span1}></span>
        <span className={styles.modal_content__span_span2}>{translate('or')}</span>
        <span className={styles.modal_content__span_span3}></span>
      </div>
      <input
        type="text"
        className={styles.modal_content_input__username}
        id="username"
        placeholder={placeholderUsername}
      />
      <input
        type="text"
        className={styles.modal_content_input__password}
        id="Password"
        placeholder={placeholderPassword}
      />
      <div className={styles.modal_content__div}>
          {translate('modalLogIn.forget')}
        {" "}
        <a
          className={styles.modal_content__div__a}
          href="/username?experiment_d2x_2020ify_buttons=enabled&amp;experiment_d2x_google_sso_gis_parity=enabled&amp;experiment_d2x_onboarding=enabled&amp;experiment_d2x_am_modal_design_update=enabled"
        >
            {translate('username')}
        </a>{" "}
          {translate('or')}{" "}
        <a
          className={styles.modal_content__div__a}
          href="/password?experiment_d2x_2020ify_buttons=enabled&amp;experiment_d2x_google_sso_gis_parity=enabled&amp;experiment_d2x_onboarding=enabled&amp;experiment_d2x_am_modal_design_update=enabled"
        >
            {translate('password')}
        </a>{" "}
        ?
      </div>
      <button className={styles.modal_content__button__login} type="submit">
          {translate('ModalLogIn')}
      </button>
      <div className={styles.modal_content__div}>
          {translate('ModalLogIn.newRaddid')}?
        <a
          className={styles.modal_content__div__a}
          href="/account/register/?experiment_d2x_2020ify_buttons=enabled&amp;experiment_d2x_google_sso_gis_parity=enabled&amp;experiment_d2x_onboarding=enabled&amp;experiment_d2x_am_modal_design_update=enabled"
        >{" "}
            {translate('ModalSignUp')}{" "}
        </a>
      </div>
    </div>
  );
};
export default ModalLogIn;
