import { useContext } from 'react'
import { MenubarContext } from './Menubar'
import { SubmenuContext } from './Submenu'
import PropTypes from "prop-types"

export const List( { children, ...props } ) => {
  const submenuContext = useContext( SubmenuContext )
  const menubarContext = useContext( MenubarContext )
  
  if ( !submenuContext || !menubarContext ) {
    throw new Error("Submenu.List must be used within a Menubar and Submenu context.")
  }

  const { listId, listRef, isExpanded, dispatch, close, first, last } = submenuContext

  const next = () => {
    const index = currentIndex === menuItems.size - 1 ? 0 : currentIndex + 1
    dispatch({ type: "move", index })
  }
  // moves to the previous item in menubar or the last item  if at the start 
  // of the list
  const previous = () => {
    const index = currentIndex === 0 ? menuItems.size - 1 : currentIndex - 1
    dispatch({ type: "move", index })
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
    dispatch({ type: "move", index })
  }

  const keyDown = ( e ) => {
    switch ( e.code ) {
      case "ArrowUp":
        e.stopPropagation()
        e.preventDefault()
        previous()
        break;
      case "ArrowDown":
        e.stopPropagation()
        e.preventDefault()
        next()
        break;
      case "ArrowRight":
        e.preventDefault()
        close()
        break;
      case "Home":
        e.stopPropagation()
        e.preventDefault()
        first()
        break;
      case "End":
        e.stopPropagation()
        e.preventDefault()
        last()
        break;
      case "Enter":
      case "Space":
        close()
        break;
      case "Escape":
        e.stopPropagation()
        e.preventDefault()
        close(true)
        break;
      case "Tab":
        close(true)
        break;
      default:
        e.stopPropagation()
        match( e )
        break;
    }
  }
  



  const listProps = {
    ...props,
    "aria-hidden": !isExpanded,
    "aria-labelledby": buttonId,
    "aria-orientation": "vertical",
    "data-menubar-submenu-list": "",
    id: listId,
    ref: listRef,
    role: "menu",
    onKeyDown: ( e ) => {
      e.preventDefault()
      keyDown(e)
    },
    onClick: ( e ) => {
      onClick?.( e )
      close()
    }
  }

  return (
    <ul hidden={!isExpanded} ref={listRef} className="submenu" {...listProps}>{children}</ul>
  )
}

List.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseDown: PropTypes.func
}