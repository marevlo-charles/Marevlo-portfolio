import { siteContent } from '@/content/site-content'

export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="copy">{siteContent.footer.copy}</div>
        <div className="legal">
          {siteContent.footer.legal.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-cin">
        CIN: {siteContent.company.cin} &middot; Registered in India
      </div>
    </footer>
  )
}
