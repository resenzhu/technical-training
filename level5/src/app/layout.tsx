import '@app/layout.css';
import type {ReactNode} from 'react';
import Redux from '@redux/redux';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({children}: RootLayoutProps): JSX.Element => (
  <html lang='en'>
    <body>
      <Redux>{children}</Redux>
    </body>
  </html>
);

export default RootLayout;
