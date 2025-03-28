import { createError } from 'h3'
import {  serverSupabaseClient } from '#supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const session = await client.auth.getSession()
    const id = getRouterParam(event, 'id') as string

    async function getCar(client: SupabaseClient, id: string) {
        let { data: cars, error } = await client.from('car').select().eq('id', id)

        if(!cars?.length) {
            throw createError({ statusMessage: 'Car not found', statusCode: 404})
        }

        if(error) {
            throw createError({ statusMessage: error.message})
        }

        return cars[0]
    }

    async function updateCar(client: SupabaseClient, id: string) {
        const body = await readBody(event)

        const { data, error } = await client.from('car').update(body).eq('id', id).select('*')
    
        if(error) {
            throw createError({ statusCode: Number(error.code), message: error.message })
        }
    
        return data
    }


    switch(event.method) {
        case 'GET':
            return getCar(client, id)
        case 'PUT':
            return updateCar(client, id)
        default:
            throw createError({ statusMessage: 'Method not allowed', statusCode: 405})
    }
})