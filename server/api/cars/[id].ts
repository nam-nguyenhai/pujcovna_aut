import { createError } from 'h3'
import {  serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const id = getRouterParam(event, 'id') as string


    let { data: cars, error } = await client.from('car').select().eq('id', id)

    if(!cars?.length) {
        throw createError({ statusMessage: 'Car not found', statusCode: 404})
    }

    if(error) {
        throw createError({ statusMessage: error.message})
    }

    return cars[0]
})