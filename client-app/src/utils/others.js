import format from 'date-fns/format'


export function formatDateTime(date) { // date format Mon Feb 27 2017 18:33:38 GMT+0000 (UTC)
    return format(date, 'dd/MM/yyyy', { weekStartsOn: 1})
}

/**
 * @param  {object} queryObj example: serialize({
  foo: "hi there",
  bar: {
    blah: 123,
    quux: [1, 2, 3]
  }
}
 * @returns {string} example: foo=hi%20there&bar=100%25
 */

export function serilaizeQuery(queryObj) {
    console.log('queryObj:', queryObj);
    var str = [];
    for (var x in queryObj)
        if (queryObj.hasOwnProperty(x)) {
            str.push(encodeURIComponent(x) + "=" + encodeURIComponent(queryObj[x]));
        }

    console.log('x:', x);
    return str.join("&")
}

/**
 * @param  {object} queryObj example: serialize({
  foo: "hi there",
  bar: {
    blah: 123,
    quux: [1, 2, 3]
  }
}
 * @returns {string} example: foo=hi+there&bar=100%25&foo=hi+there&bar=100%25 //
    This function does not work for nested objects. If you try to run it, you'll get something like this: foo=hi+there&bar=100%25&foo=hi+there&bar=100%25&foo=hi+there&bar=%5Bobject+Object%5D
 */
export function serilaizeQueryNotNested(queryObj) {
    const searchParams = new URLSearchParams();
    
    Object.keys(queryObj).forEach(key => searchParams.append(key, queryObj[key]));
    
    return searchParams.toString()
}

/**
 * @param  {object} routeData
 * @param  {object} pageData 
}
 * @returns {{
        page: number,
        limit: number,
        email: string,
        name: string,
        download: boolean,
        title: string,
        clientName: string,
        status: boolean,

    }}
 */
export function assembleQueryList(routeData, pageData) {
    let queryObj = {}

    // build page num into query object
    if (typeof pageData !== 'undefined') {
        if (typeof pageData.paginationNum !== 'undefined' && typeof pageData.paginationNum === 'number') {
            queryObj.page = pageData.paginationNum
        }  
        // add limit to query list
        if (typeof pageData.limit !== 'undefined' && typeof pageData.limit === 'number') {
            queryObj.limit = pageData.limit
        } 
    }

    // build download into query list if download is set to true
    if ((typeof routeData.query.download !== 'undefined' &&  routeData.query.download) || pageData.download) {
        queryObj.download = true
    }

    // build client name into query list if route path is on '/clients' and a query name string exists
    if (routeData.path.includes('clients')) {
        if (typeof routeData.query.name !== 'undefined') {
            queryObj.name = routeData.query.name
        }
    }

    // build query for projects // TO DO
    return queryObj
}

// function parseQuery(search) {
//     const query = {};
//     // avoid creating an object with an empty key and empty value
//     // because of split('&')
//     if (search === '' || search === '?')
//         return query;
//     const hasLeadingIM = search[0] === '?';
//     const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
//     for (let i = 0; i < searchParams.length; ++i) {
//         // pre decode the + into space
//         const searchParam = searchParams[i].replace(PLUS_RE, ' ');
//         // allow the = character
//         const eqPos = searchParam.indexOf('=');
//         const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
//         const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
//         if (key in query) {
//             // an extra variable for ts types
//             let currentValue = query[key];
//             if (!Array.isArray(currentValue)) {
//                 currentValue = query[key] = [currentValue];
//             }
//             currentValue.push(value);
//         }
//         else {
//             query[key] = value;
//         }
//     }
//     return query;
// }