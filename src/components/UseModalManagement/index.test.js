import React from 'react';
import { shallow } from 'enzyme';
import UseModalManagement from './index'
import { renderHook, act } from '@testing-library/react-hooks';

function testHook(hook) {
  let output;
  function HookWrapper() {
    output = hook();
    return (
      <></>
    );
  }
  shallow(<HookWrapper />);
  return output;
}

describe('The UseModalManagement hook', () => {
    it('should not throw an error', () => {
        // testHook(UseModalManagement);
        remderHook(() => UseModalManagement());
    });
    it('should describe a closed modal by default', () => {
        const { result } = renderHook(() => UseModalManagement());
        expect(result.current.isModalOpened).toBe(false);
    });
    
    describe('when the openModal function is called', () => {
        it('should describe an opened modal', () => {
            const { result } = renderHook(() => UseModalManagement());
            // const { result } = renderHook(() => UseModalManagement(true));
            act(() => {
                result.current.openModal();
            });
            expect(result.current.isModalOpened).toBe(true);
        });
    });
});