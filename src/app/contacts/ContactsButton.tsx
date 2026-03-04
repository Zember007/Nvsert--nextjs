'use client';

import { useHeaderContext } from 'shared/contexts';
import { useButton } from 'shared/hooks';
import styles from '@/assets/styles/base/contacts-base.module.scss';

type ContactsButtonProps = {
  label: string;
  href?: string;
};

const ContactsButton = ({ label, href }: ContactsButtonProps) => {
  const { openDefaultModal } = useHeaderContext();
  const { setButtonRef, setWrapperRef } = useButton();

  const content = (
    <>
      <span className={styles.sendText}>{label}</span>
      <span className={styles.sendIconLeft}>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 9.48438V7.48438H0V9.48438H3ZM8.96767 1.48438L7.52908 2.91514L12.1092 7.47151H6V9.49623H12.1092L7.52908 14.0526L8.96767 15.4844L16 8.48438L15.2822 7.76899L14.5634 7.0526L8.96767 1.48438Z"
            fill="white"
          />
        </svg>
      </span>
    </>
  );

  return (
    <div className={`${styles.mainButtonWrap} ${styles.tariffWrap}`} ref={setWrapperRef}>
      {href ? (
        <a
          href={href}
          download
          rel="noopener noreferrer"
          className={`${styles.mainButton} ${styles.btnIconAn} ${styles.tariff}`}
        >
          {content}
        </a>
      ) : (
        <button
          ref={setButtonRef}
          type="button"
          className={`${styles.mainButton} ${styles.btnIconAn} ${styles.tariff}`}
          onClick={() => openDefaultModal('orderForm')}
        >
          {content}
        </button>
      )}
    </div>
  );
};

export default ContactsButton;
