import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import usePrevious from '../utilities/usePrevious'

export const MenubarContext = createContext()

export function Menubar ( { children, ...props } ) {
  const [ currentIndex, setCurrentIndex ] = useState( 0 )
  const previousIndex = usePrevious( currentIndex ) ?? null
  const menuItems = useRef( new Set() ).current
  const value = useMemo(() => ({menuItems}), [menuItems])
  


  // focus on first item in menubar
  const first = () => setCurrentIndex( 0 )
  // focus on last item in menubar
  const last = () => setCurrentIndex( menuItems.size - 1 )
  // advance focus to next item or go back to first item if at end of list
  const next = () => {
    const index = currentIndex === menuItems.size - 1 ? 0 : currentIndex + 1
    setCurrentIndex(index)
  }
  // moves to the previous item in menubar or the last item  if at the start 
  // of the list
  const previous = () => {
    const index = currentIndex === 0 ? menuItems.size - 1 : currentIndex - 1
    setCurrentIndex(index)
  }
  // moves focus to next item in menubar that starts with character
  // does not move if none of the items started with the character
  const match = ( e ) => {
    const items = Array.from( menuItems )
    const reorderedItems = [
      ...items.slice( currentIndex ),
      ...items.slice(0, currentIndex)
    ]
    const matches = reorderedItems.filter( ( menuItem ) => {
      const { textContext } = menuItem.firstChild
      const firstLetter = textContext.toLowerCase().charAt( 0 )
      return e.key === firstLetter
    } )
    if ( !matches.length ) {
      return;
    }
    const currentNode = items[ currentIndex ]
    const nextMatch = matches.includes( currentNode ) ? matches[ 1 ] : matches[ 0 ];
    const index = items.findIndex( ( item ) => item === nextMatch )
    setCurrentIndex( index )
  }
  // maps key press to actions defined above
  const keyDown = ( e ) => {
    e.stopPropagation()
    switch ( e.code ) {
      case "ArrowLeft":
        e.preventDefault()
        previous()
        break;
      case "ArrowRight":
        e.preventDefault()
        next()
        break;
      case "End":
        e.preventDefault()
        last()
        break;
      case "Home":
        e.preventDefault()
        first()
        break;
      default:
        match( e )
        break;
    }
  }



  const listProps = {
    ...props,
    "aria-orientation": "horizontal",
    "data-menubar-list": "",
    role: "menubar",
    onKeyDown: (e) => {keyDown(e)}
  }

  useEffect( () => {
    if ( currentIndex !== previousIndex ) {
      const items = Array.from( menuItems )
      const currentNode = items[ currentIndex ]?.firstChild
      const previousNode = items[ previousIndex ]?.firstChild
    
      previousNode?.setAttribute( "tabindex", "-1" )
      currentNode?.setAttribute( "tabindex", "0" )
      currentNode?.focus()
    }
  },[currentIndex, previousIndex, menuItems])

  return <MenubarContext.Provider><ul {...listProps}>{children}</ul></MenubarContext.Provider>
}

