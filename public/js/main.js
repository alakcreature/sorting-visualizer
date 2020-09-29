let divs = [];
let div_sizes=[];
const main_content = document.querySelector(".main-content");
const bars = document.querySelectorAll('.bar');

const generate = ()=>{
    main_content.innerHTML="";
    for(var i=0;i<10;i++){
        var bar_height = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
        div_sizes.push(bar_height);
        divs[i] = document.createElement('div');
        divs[i].classList.add("bar")
        main_content.appendChild(divs[i]);
        divs[i].style = `height: ${bar_height}px; width: 17px; background-color: rgb(228, 31, 195);
        border-bottom-right-radius: 13px;
        border-bottom-left-radius: 13px;`;
    }
}

generate();
var speed = 250;
var delay_time=10000/(Math.floor(divs.length/10)*speed);        //Decrease numerator to increase speed.
var c_delay=0;

const colordivs = (div_el,d_height,color) =>{

    window.setTimeout(()=>{
        div_el.style = `height: ${d_height}px; width: 17px; background-color: ${color};
        border-bottom-right-radius: 13px;
        border-bottom-left-radius: 13px;`;
    },c_delay+=delay_time);
}


const merge = (start,mid,end) =>{
    var p=start,q=mid+1;
    var Arr=[],k=0;

    for(var i=start; i<=end; i++)
    {
        if(p>mid)
        {
            Arr[k++]=div_sizes[q++];
            colordivs(divs[q-1],div_sizes[q-1],"red");//Color update
        }
        else if(q>end)
        {
            Arr[k++]=div_sizes[p++];
            console.log(div_sizes[p-1]);
            colordivs(divs[p-1],div_sizes[p-1],"red");//Color update
        }
        else if(div_sizes[p]<div_sizes[q])
        {
            Arr[k++]=div_sizes[p++];
            colordivs(divs[p-1],div_sizes[p-1],"red");//Color update
        }
        else
        {
            Arr[k++]=div_sizes[q++];
            colordivs(divs[q-1],div_sizes[q-1],"red");//Color update
        }
    }

    for(var t=0;t<k;t++)
    {
        div_sizes[start++]=Arr[t];
        colordivs(divs[start-1],div_sizes[start-1],"rgb(255, 81, 104);");//Color update
    }
}


const mergesort = (start,end) => {
    // console.log("hi")
    if(start < end)
    {
        var mid=Math.floor((start + end) / 2);
        colordivs(divs[mid],div_sizes[mid],"yellow");//Color update

        mergesort(start,mid);
        mergesort(mid+1,end);

        merge(start,mid,end);
    }
}

const sort = ()=>{
    mergesort(0,9);
    c_delay=0;
}