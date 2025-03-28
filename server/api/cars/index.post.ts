import { createError } from 'h3'
import {  serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const session = await client.auth.getSession()

    if(!session.data.session) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const body = await readBody(event)

    const { data, error } = await client.from('car').insert(body).select('*')

    if(error) {
        throw createError({ statusCode: Number(error.code), message: error.message })
    }

    return data
})