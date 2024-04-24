import { AnchorLink } from "./anchorLink";
import phoneSvg from '../../assets/header/phone.svg'
import whatsSvg from '../../assets/header/whatsapp.svg'
import facebookSvg from '../../assets/header/facbeook.svg'
import linkedinSvg from '../../assets/header/linkedin.svg'


export function Header(){
  return(
    <div className="flex items-center gap-5 py-2 justify-between position">
        <a href="/">
          <img src="https://media.licdn.com/dms/image/C4D0BAQFg5qRKjRcGVg/company-logo_200_200/0/1630460188565/develcode_logo?e=1721865600&v=beta&t=TYb1Qx8VuPNaW8i_GUPcnVnmHQq8gaz_NesYMFshmZQ" alt="Develcode logo" className="w-28"/>
        </a>
      <nav className="flex flex-row gap-5">
        <AnchorLink imgHref={phoneSvg} text="(54) 3536.0518"/>
        <AnchorLink imgHref={whatsSvg} href={"http://api.whatsapp.com/send?phone=5554991657097&text=Oi"} text="(54) 99165.7097"/>
        <AnchorLink imgHref={facebookSvg} href={"https://www.facebook.com/develcodetecnologia"}/>
        <AnchorLink imgHref={linkedinSvg} href={"https://www.linkedin.com/company/develcode/"}/>
      </nav>
    </div>
  )
}