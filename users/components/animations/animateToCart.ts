import { animate } from "framer-motion"

export function animateToCart(image:HTMLImageElement){
    const cart=document.getElementById("cart-icon")
    if(!image||!cart) return
    const imageRect=image.getBoundingClientRect()
    const cartRect=cart.getBoundingClientRect()
    const clone=image.cloneNode(true) as HTMLImageElement
    clone.style.position="fixed"
    clone.style.left=`${imageRect.right}px`
    clone.style.top=`${imageRect.top}px`
    clone.style.width=`150px`
    clone.style.height=`150px`
    clone.style.pointerEvents="none"
    clone.style.zIndex="10000000000000"
    document.body.append(clone)
    animate(clone,
        {
            left: cartRect.left,
            top: cartRect.top,
            scale: 0.2,
            opacity: 0.4,
        },
        {
            duration:0.9,
            ease:"easeInOut",
            onComplete:() => clone.remove()
        }
    )
}