import { createError } from 'h3'
import {  serverSupabaseClient, serverSupabaseUser, serverSupabaseSession } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const session = await client.auth.getSession()

    if(!session.data.session) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    let reservations: any[] = []

    try {
        const { data, error } = await client.from('reservation').select('*')

        reservations = data || []
    } catch (error: any) {
        console.log(error)
        throw createError({ statusMessage: error.message})
    }


    return reservations
})