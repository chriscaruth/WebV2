import React, { useEffect } from 'react';
import { AnimatePresence, motion, useTransform, useMotionValue } from 'framer-motion';
import Name from './Name/Name';
import useScreenDimensions from '../hooks/useScreenDimensions';
import { useGlobalUI } from '../context/GlobalUIContext';

export const Interface = () => {
    const screen = useScreenDimensions();
    const { state } = useGlobalUI();

    const scrollY = useMotionValue(state.scrollOffset);
  
    useEffect(() => {
      scrollY.set(state.scrollOffset);
    }, [state.scrollOffset, scrollY]);
  
    const opacityTransformer = useTransform(scrollY, [0, 1000], [1, 0]);

    return (
        <motion.div style={{ background: 'white', opacity: opacityTransformer }} className={'h-screen w-screen relative'}>
            {screen.width != undefined &&
                <>
                    <motion.div
                        style={{
                            position: 'fixed', 
                            width: '100%', 
                            top: '50%', 
                            transform: 'translate(0, -60%)'
                        }}
                    >
                        <Name first="Chris" last="Caruth" allowEdit={false} width={screen.width} />
                    </motion.div>
                </>
            }
        </motion.div>
    );
}