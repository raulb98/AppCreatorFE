import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

const sections = [
  { title: 'News', url: '#' },
  { title: 'Information', url: '#' },
];

const mainFeaturedPost = {
  title: 'ERP AppCreator',
  description:
    "Application Under Development for ERP Purpose. Currently Integration EFactura."
};

const featuredPosts = [
  {
    title: 'Website Under Development',
    date: 'May 18',
    description:
      'ERP support already made. Looking forward for EFactura Integration',
    image: 'https://www.google.com/search?sca_esv=2e47e62a151241ca&sxsrf=ADLYWIKmDsQ3NkOflnA-4KQIZG-8IjqrHg:1716026409926&q=EFactura&uds=ADvngMjTirQl6rUn_0xbjWZjLsFVSjSIHuPDo6HJURblNI6UEkugUw-H9H5IDY97GyPUyLNe7pTogc2gx97jZcZBzDv1JXLeK8rbw7UHdYYGzRZd2FGB0GyFYgBNQgYxYcEBtsh32Cf709jN-HFTC_qGk1eG8LJDlrNwsmFUtFcsj1zF5Fh1y9TAilE5Z9tWaZkVgJG75m8DxouS0pTm0FD6I_8nVKSaEbCcGiiDOw9sWSIapCKxA4VG1H63U6s6zzi5coZ9gwlLNbs_Mx_TOqxd3lJxket1rA&udm=2&prmd=invbz&sa=X&ved=2ahUKEwibyNrE-JaGAxUggv0HHcaMChYQtKgLegQIFxAB&biw=1536&bih=858&dpr=1.25#vhid=7atkI6880Mj3fM&vssid=mosaic',
    imageLabel: 'Image Text',
  }
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'ERP Application Under Development',
  archives: [
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="AppCreator ERP" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Under Development"
      />
    </ThemeProvider>
  );
}
