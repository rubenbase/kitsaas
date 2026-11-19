import { render } from '@solidjs/web'

// Import the global stylesheet first: it declares Tailwind's cascade layers,
// and component stylesheets (like ui/button.css) layer into them.
import './styles.css'

import { AppShell } from '#/components/app-shell'
import { Router } from '#/router'

const root = document.getElementById('root')

if (!root) throw new Error('Root element #root not found')

render(
  () => (
    <Router>
      {(props) => <AppShell>{props.children}</AppShell>}
    </Router>
  ),
  root,
)
