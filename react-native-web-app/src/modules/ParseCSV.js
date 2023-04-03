import { useEffect } from 'react'
import Papa from 'papaparse'

export default function ParseCSV ( {path, config = {}} ) {
  useEffect( () => {
    const fetchParseData = async () => {
      const data = await Papa.parse( path, {
        ...config,
        download: true,
        complete: ( (result) => {
        console.log(result.data)
        } ),
      } )
      console.log(data)
    }
    fetchParseData().catch(console.error)
  },[path, config])
}