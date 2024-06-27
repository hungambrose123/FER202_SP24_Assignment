import React from 'react'

const Footer = () => {
  return (
    <div class="container fixed-bottom">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        1
      </a>
      <span class="mb-3 mb-md-0 text-muted">©2024 Community QA Website developed by HungNVHE173464</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"><a class="text-muted" href="#">1</a></li>
      <li class="ms-3"><a class="text-muted" href="#">2</a></li>
      <li class="ms-3"><a class="text-muted" href="#">3</a></li>
    </ul>
  </footer>
</div>
  )
}

export default Footer