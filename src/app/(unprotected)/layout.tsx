import '../globals.css';
import { Inter } from 'next/font/google';
import { Grid } from '@/components/Grid';

const inter = Inter({ subsets: ['latin'] });

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.className}>
      <Grid
        gridAutoColumns="1fr"
        gridAutoRows="100vh"
        alignItems="center"
        justifyItems="center"
      >
        {children}
      </Grid>
    </div>
  );
}

export default AuthLayout;
