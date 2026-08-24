import { DesktopHeader } from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";

export function Header() {
  return (
    <>
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
    </>
  );
}
