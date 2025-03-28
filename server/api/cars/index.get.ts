import { createError } from 'h3'
import {  serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    let { data: cars, error } = await client.from('car').select('*')
    
    if(error) {
        throw createError({ statusMessage: error.message})
    }

    return cars
})