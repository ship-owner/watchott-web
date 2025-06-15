const Footer = () => {
    return (
        <footer className="bg-dark mt-auto">
            <div className="container px-5 py-4 mt-auto ">
                <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div className="col-auto">
                        <div className="small m-0 text-white">
                            &copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.
                        </div>
                    </div>
                    <div className="col-auto">
                        <a className="link-light small" href="#!">Privacy</a>
                        <span className="text-white mx-1">&middot;</span>
                        <a className="link-light small" href="#!">Terms</a>
                        <span className="text-white mx-1">&middot;</span>
                        <a className="link-light small" href="#!">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;