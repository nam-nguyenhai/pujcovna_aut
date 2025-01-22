export function useUser() {
  const isUserLogged = useSessionStorage('isUserLogged', false)

  return { isUserLogged: computed(() => isUserLogged) }
}
