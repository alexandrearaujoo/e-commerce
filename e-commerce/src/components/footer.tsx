const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <section className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          &copy; {new Date().getFullYear()} Store. Todos os direitos
          reservadors.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
