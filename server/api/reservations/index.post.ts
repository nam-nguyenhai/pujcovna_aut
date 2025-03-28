import { createError } from 'h3'
import {  serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const session = await client.auth.getSession()

    if(!session.data.session) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }

    const body = await readBody(event)

    const { data: reservationsWithSameDate } = await client.from('reservation').select('*').lte('fromDate', body.toDate).gte('toDate', body.fromDate); 

    if(reservationsWithSameDate && reservationsWithSameDate.length > 0 ) { 
        throw createError({ statusCode: 400, message: 'Reservation already exists for the same date' })
    }

    const { data, error } = await client.from('reservation').insert(body).select('*')

    if(error) {
        throw createError({ statusCode: Number(error.code), message: error.message })
    }

    return data
})