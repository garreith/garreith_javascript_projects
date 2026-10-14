export async function get_number(){
    return fetch("/numbers.json").
     then((res) => res.json()).
      then((data) => 
        {return data}
        )
}
