import { createContext, useCallback, useEffect, useMemo, useReducer, useRef } from 'react'
import PropTypes from "prop-types"

export const SubmenuContext = createContext()

const submenuInitialState = {
  currentIndex: null,
  previousIndex: null,
  isExpanded: false,
}

function submenuReducer ( state, action ) {
  switch ( action.type ) {
    case "expand":
      return { ...state, isExpanded: true }
    case "collapse":
      return submenuInitialState
    case "move":
      return {
        ...state,
        isExpanded: true,
        currentIndex: action.index,
        previousIndex: state.currentIndex
      }
    default:
      throw new Error(`${action.type} not recognized`)
  }
}

export const Submenu = ( { children } ) => {
  const id = useRef( _.uniqueId( "submenu--" ) ).current
  const buttonId = `button--${ id }`
  const listId = `list--${ id }`
  const buttonRef = useRef()
  const listRef = useRef()
  const menuItems = useRef( new Set() ).current
  const [ state, dispatch ] = useReducer( submenuReducer, submenuInitialState )
  const { isExpanded, currentIndex, previousIndex } = state
  
  const open = useCallback( () => dispatch( { type: "expand" } ), [] )
  const close = useCallback( (focusButton = false) => {
    if ( isExpanded ) {
      focusButton && buttonRef.current?.focus()
      dispatch( { type: "collapse" } )
    }
  }, [] )
  const first = useCallback( () => dispatch( { type: "move", index: 0 } ), [] )
  const last = useCallback( () => dispatch( { type: "move", index: menuItems.size -1  } ), [menuItems.size] )
  const move = useCallback( () => dispatch( { type: "move", index } ), [] )
  const value = useMemo( () => ( { buttonId, buttonRef, listId, listRef, menuItems, currentIndex, isExpanded, open, close, first, last, move } ), [ buttonId, buttonRef, listId, listRef, menuItems,  currentIndex, isExpanded, open, close, first, last, move ] )
  
  useEffect( () => {
    const items = Array.from( menuItems )
    if ( currentIndex !== previousIndex ) {
      const currentNode = items[ currentIndex ]?.firstChild
      currentNode.focus()
    }
  }, [ menuItems, currentIndex, previousIndex ] )
  
  useEffect( () => {
    const menuNode = listRef.current.parentNode
    menuNode?.addEventListener( "mouseenter", () => open(), false )
    menuNode?.addEventListener( "mouseleave", () => close(), false )

    return () => {
      menuNode?.addEventListener( "mouseenter", () => open(), false )
      menuNode?.addEventListener( "mouseleave", () => close(), false )
    }
  }, [isExpanded, close, open])
  return (
    <SubmenuContext.Provider value={value}>{children}</SubmenuContext.Provider>
  )
}

Submenu.propTypes = {
  children: Prop
}