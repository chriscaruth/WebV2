import { useScroll } from '@react-three/drei';
import React, { useEffect } from 'react';

interface GlobalUIState {
    scrollOffset: number;
}
  
interface SetScrollOffsetAction {
    type: 'SET_SCROLL_OFFSET';
    payload: number;
}
  
type GlobalUIAction = SetScrollOffsetAction;

function globalUIReducer(state: GlobalUIState, action: GlobalUIAction): GlobalUIState {
    switch (action.type) {
        case 'SET_SCROLL_OFFSET':
            return { ...state, scrollOffset: action.payload };
        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}  
  
interface GlobalUIContextValue {
    state: GlobalUIState;
    setScrollOffset: (offset: number) => void;
}
  
const GlobalUIContext = React.createContext<GlobalUIContextValue | null>(null);
  
export function GlobalUIProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(globalUIReducer, { scrollOffset: 0 });
    const data = useScroll();

    const value: GlobalUIContextValue = {
        state,
        setScrollOffset: (offset: number) => dispatch({ type: 'SET_SCROLL_OFFSET', payload: offset }),
    };

    useEffect(() => {
        value.setScrollOffset(data.offset * 1000); //Should not be 4000 and dynamic based on content of page / device height.
    }, [data.offset, value])

    return (
        <GlobalUIContext.Provider value={value}>
            {children}
        </GlobalUIContext.Provider>
    );
}
  
export function useGlobalUI() {
    const context = React.useContext(GlobalUIContext);
    if (context === null) {
        throw new Error('useGlobalUI must be used within a GlobalUIProvider');
    }
    return context;
}