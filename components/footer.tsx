"use client";

import Link from "next/link";

import { JoinNewsletterForm } from "./forms/join-newsletter-form";
import Container from "@/components/ui/container";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer
      className={`${
        pathname.endsWith("/checkout") ? "hidden" : "block"
      } w-full border-t bg-background`}
    >
      <Container>
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <section className="flex flex-col gap-10 lg:flex-row lg:gap-20">
            <section
              id="footer-branding"
              aria-labelledby="footer-branding-heading"
            >
              <Link href="/" className="flex w-fit items-center space-x-2">
                <span className="font-bold">Oryon</span>
                <span className="sr-only">Home</span>
              </Link>
            </section>
            <section
              id="footer-links"
              className="grid flex-1 gap-10 grid-cols-2 sm:grid-cols-3"
            >
              <div className="space-y-3">
                <h4 className="text-base font-medium">Social</h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Twitter
                      <span className="sr-only">twitter</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Instagram
                      <span className="sr-only">instagram</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Facebook
                      <span className="sr-only">facebook</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Tiktok
                      <span className="sr-only">tiktok</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-medium">Help</h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      About
                      <span className="sr-only">about</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Contact
                      <span className="sr-only">contact</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Terms
                      <span className="sr-only">terms</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Privacy
                      <span className="sr-only">privacy</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-medium">Social</h4>
                <ul className="space-y-2.5">
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Twitter
                      <span className="sr-only">twitter</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Instagram
                      <span className="sr-only">instagram</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Facebook
                      <span className="sr-only">facebook</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Tiktok
                      <span className="sr-only">tiktok</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>
            <section
              id="newsletter"
              aria-labelledby="newsletter-heading"
              className="space-y-3"
            >
              <h4 className="text-base font-medium">
                Subscribe to our newsletter
              </h4>
              <JoinNewsletterForm />
            </section>
          </section>
          <section className="mx-auto py-10">
            <p className="text-center">
              &copy; {new Date().getFullYear()} Oryon, Inc, All rights reserved
            </p>
          </section>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
