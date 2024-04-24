interface AnchorProps{
  imgHref: string;
  href?: string;
  text?: string;
}

export function AnchorLink(anchorProps:AnchorProps){
  return(
    <a href={anchorProps.href} className="flex gap-2 hover:underline hover:text-blue-500">
      <img src={anchorProps.imgHref} className="w-4 h-auto"/>
      {anchorProps.text ? (
        <span className="text-xs font-thin font-serif">{anchorProps.text}</span>
      ) : null}
    </a>
  )
}