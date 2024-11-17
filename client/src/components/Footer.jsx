import { Footer } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitch, BsTwitterX } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function FooterCom() {
  return <Footer container className="border border-t-8 border-indigo-500">
    <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex">
            <div className="mt-5">
                <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                    <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-300 to-purple-200 rounded-lg text-gray-800'>
                        100xdev
                    </span>
                    <span className='text-gray-800 dark:text-blue-300'>
                        Blogs
                    </span>
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                <div>
                    <Footer.Title title='About'/>
                    <Footer.LinkGroup col>
                        <Footer.Link
                            href="https://www.100jsprojects.com"
                            target="_blank"
                            rel=" noopener noreferrer"
                        >
                            100 JS Projects
                        </Footer.Link>
                        <Footer.Link href="/about">About</Footer.Link>
                        <Footer.Link href="/projects">Projects</Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                <Footer.Title title='Follow us'/>
                    <Footer.LinkGroup col>
                        <Footer.Link
                            href="#"
                            target="_blank"
                            rel=" noopener noreferrer"
                        >
                            GitHub
                        </Footer.Link>
                        <Footer.Link href="/#">LinkedIn</Footer.Link>
                        <Footer.Link href="/#">X</Footer.Link>
                    </Footer.LinkGroup> 
                </div>
                <div>
                <Footer.Title title='Legal'/>
                    <Footer.LinkGroup col>
                        <Footer.Link
                            href="#"
                            target="_blank"
                            rel=" noopener noreferrer"
                        >
                            Privacy Policy
                        </Footer.Link>
                        <Footer.Link href="/#">Terms & Conditions</Footer.Link>
                    </Footer.LinkGroup>  
                </div>
            </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
                href="#"
                by="100xdevBihan"
                year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
                <Footer.Icon href="#" icon={BsFacebook} />
                <Footer.Icon href="#" icon={BsTwitterX} />
                <Footer.Icon href="#" icon={BsTwitch} />
                <Footer.Icon href="#" icon={BsGithub} />
                <Footer.Icon href="#" icon={BsInstagram} />
            </div>
        </div>
    </div>
  </Footer>

}