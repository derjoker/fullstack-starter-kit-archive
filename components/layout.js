import Link from 'next/link'
import Head from 'next/head'

export default ({ children, title = 'fullstack-starter-kit' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <nav>
        <Link href='/'><a>Home</a></Link> |
        <Link href='/about'><a>About</a></Link> |
        <Link href='/about/me'><a>About/Me</a></Link>
      </nav>
    </header>

    { children }

  </div>
)
