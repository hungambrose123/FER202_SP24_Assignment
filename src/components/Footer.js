import React from 'react'

const Footer = () => {
  return (
    <div className="container fixed-bottom">
  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        1
      </a>
      <span className="mb-3 mb-md-0 text-muted">©2024 Community QA Website developed by HungNVHE173464</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a className="text-muted" href="#">1</a></li>
      <li className="ms-3"><a className="text-muted" href="#">2</a></li>
      <li className="ms-3"><a className="text-muted" href="#">3</a></li>
    </ul>
  </footer>
</div>
  )
}

export default Footer