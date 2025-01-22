export function useUser() {
  const isUserLogged = useSessionStorage('isUserLogged', false)

  function setUserLogged() {
    isUserLogged.value = true
  }

  return { isUserLogged, setUserLogged }
}
