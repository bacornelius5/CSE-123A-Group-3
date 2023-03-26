import { useContext } from 'react'
import { SubmenuContext } from './Submenu'
import PropTypes from 'prop-types'

export const Trigger = ( { onKeyDown, ...props } ) => {
  const submenuContext = useContext( SubmenuContext )
  
  if ( !submenuContext ) {
    throw new Error( "Trigger must be used within a Submenu context." )
  }

  const { buttonId, buttonRef, listId, isExpanded, first, last } = submenuContext

  const keyDown = ( e ) => {
    switch ( e.code ) {
      case "ArrowUp":
        e.stopPropagation()
        last()
        break;
      case "ArrowDown":
        e.stopPropagation()
        first()
        break;
      case "Enter":
      case "Space":
        e.stopPropagation()
        first()
        break;
      default:
        break;
    }
  }

  const buttonProps = {
    ...props,
    "aria-haspopup": true,
    "aria-expanded": isExpanded,
    "aria-controls": listId,
    "data-menubar-submenu-trigger": "",
    id: buttonId,
    ref: buttonRef,
    type: "button",
    onKeyDown: ( e ) => {
      onKeyDown?.( e )
      keyDown(e)
    },
    onFocus: ( e ) => {
      const isFromSubmenu = e.relatedTarget?.getAttribute( "data-menubar-submenu-menuitem" ) === ""
      if ( isFromSubmenu ) {
        open()
      }
    }
  }

  return <button {...buttonProps} />
}

Trigger.propTypes = {
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseOver: PropTypes.func
}