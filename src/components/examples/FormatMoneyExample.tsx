import FormatMoney from '@/components/common/FormatMoney';

const FormatMoneyExample: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">FormatMoney Component Examples</h2>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Usage:</h3>
        <div className="space-y-1">
          <p>Default (THB): <FormatMoney amount={1500} /></p>
          <p>USD amount: <FormatMoney amount={1500} baseCurrency="USD" /></p>
          <p>EUR amount: <FormatMoney amount={1500} baseCurrency="EUR" /></p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Without Symbol:</h3>
        <div className="space-y-1">
          <p>No symbol: <FormatMoney amount={1500} showSymbol={false} /></p>
          <p>No decimals: <FormatMoney amount={1500} showDecimals={false} /></p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold">With Custom Styling:</h3>
        <div className="space-y-1">
          <p>
            <FormatMoney 
              amount={1500} 
              className="text-2xl font-bold text-green-600" 
            />
          </p>
          <p>
            <FormatMoney 
              amount={2500} 
              className="text-lg text-red-600" 
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormatMoneyExample; 