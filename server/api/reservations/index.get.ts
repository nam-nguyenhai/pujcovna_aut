import { serverSupabaseClient } from '#supabase/server'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const session = await client.auth.getSession()

    if(!session.data.session) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const { data, error } = await client.from('reservation').select('*')

    if(error) {
        throw createError({ statusMessage: error.message})
    }

    return data
})