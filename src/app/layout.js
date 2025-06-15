import { Suspense } from 'react';
import styles from './styles.module.scss';

export const metadata = {
  title: "EPG",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: 'black', color: 'white'}}>
        <div className={styles.app_wrapper}>
          <Suspense>
            {children}
          </Suspense>
        </div>
      </body>
    </html>
  );
}
