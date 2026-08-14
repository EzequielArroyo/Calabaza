import NavLinks from "./nav-links";
export default function SideNav(){
    return (
      <aside className="h-100vh w-64 hidden md:flex flex-col left-0 top-16 sticky bg-surface border-r">
        <div className="flex flex-col h-full px-4">
          <div className="mb-8 px-4">
            <h1 className=" text-2xl text-primary">Mi tienda</h1>
            <p>Administrador</p>
          </div>
          <nav className="flex flex-1 flex-col space-y-2 text-text-secondary">
            <NavLinks/>
          </nav>
        </div>
      </aside>
    );
}