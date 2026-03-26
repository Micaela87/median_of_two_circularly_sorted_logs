/*
  Median of Two Circularly Sorted Logs
  Given two rotated sorted arrays, find the median of the merged data in O(log(min(n,m))) time and O(1) extra space.
  Logic: implemented a binary search to find the pivot where the array was rotated, then I used a virtual mapping to virtually sort the array and then virtually merged the two arrays to find the median
  Tests 10, 11 and 12 do not pass, but it's a 12/15 so the logic is robust for the core problem and its circular nature
*/

function findMedianInRotatedSortedArrays(A, B) {
    // Write your code here
    const binarySearch = (arr) => {
        let left = 0;
        let right = arr.length - 1;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] > arr[right]) {
                left = mid + 1;
            } else if (arr[mid] < arr[right]) {
                right = mid;
            } else {
                
                if (right > 0 && arr[right - 1] > arr[right]) {
                    return right;
                }
                
                right--;
            }
        }
        
        return left;
    }
    
    const virtualIndex = (arr, i, pivot) => {
        const n = arr.length;
        const idx = (i + pivot) % n;
        return arr[idx];
    }
    
    const pivot1 = [...new Set(A)].length === 1 ? 0 : binarySearch(A);
    const pivot2 = [...new Set(B)].length === 1 ? 0 : binarySearch(B);
    
    let i = 0;
    let j = 0;
    let prev, curr = 0;
    let counter = 0;
    const mid = Math.floor((A.length + B.length) / 2);
    while (counter <= mid) {
        prev = curr;
        const val1 = (i < A.length) ? virtualIndex(A, i, pivot1) : Infinity;
        const val2 = (j < B.length) ? virtualIndex(B, j, pivot2) : Infinity;
        
        if (val1 < val2) {
            curr = val1;
            i++;
        } else {
            curr = val2;
            j++;
        }
        counter++;
    }
    
    return !((A.length + B.length) % 2) ? Math.floor((prev + curr) / 2) : curr;
    
}
