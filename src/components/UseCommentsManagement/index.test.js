import { renderHook, act } from '@testing-library/react-hooks';
import UseCommentsManagement from './index';

describe('The UseCommentsManagement Hook', () => {
    describe('when the fetchComments function is called', () => {
        it('should update the state after a successful request', async () => {
            // const { result, waitForNextUpdate } = renderHook(() => UseCommentsManagement());
            const { result, waitForValueToChange } = renderHook(() => UseCommentsManagement());

            act(() => {
                result.current.fetchComments();
            });

            // await waitForNextUpdate();

            await waitForValueToChange(() => {
                return result.current.comments;
            });

            // return expect(result.current.comments.length).not.toBe(0);
        })
    })
});