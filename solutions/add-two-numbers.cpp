class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* answer = new ListNode();
        ListNode* current = answer;
        int carry = 0 ; 

        while( l1 || l2 || carry!=0){
            int sum = carry;
            if(l1){
                sum+=l1->val;
                l1=l1->next;
            }
            if(l2){
                sum+=l2->val;
                l2=l2->next;
            }
            carry = sum/10;
            current->next = new ListNode(sum%10);
            current=current->next;
        }
        return answer->next ;
    }
};
