import { DesktopFooter } from "./DesktopFooter";
import { MobileNavbar } from "./MobileNavbar";

export function Footer() {
  return (
    <>
      <div className="md:hidden">
        <MobileNavbar />
      </div>
      <div className="hidden md:block">
        <DesktopFooter />
      </div>
    </>
  );
}
