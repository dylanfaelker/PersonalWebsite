import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setTitle } from '../../redux/slice/globalSlice'

const usePageTitle = (title) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setTitle(title))
  }, [dispatch, title])
}

export default usePageTitle
