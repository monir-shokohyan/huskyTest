import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router } from './Shared/Providers/CreateBrowserRouter/CreateBrowserRouter'
import { RouterProviderTSX } from './Shared/Providers/RouterProvider/RouterProvider'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProviderTSX/>
  </StrictMode>,
)
